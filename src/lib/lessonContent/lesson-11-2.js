/**
 * Lesson 11-2: Простий REST API + підсумки курсу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson11_2 = {
  lessonId: "lesson-11-2",
  moduleId: "module-11",
  order: 2,
  title: "Простий REST API + підсумки курсу",
  
  learningObjectives: [
    "Створити повноцінний REST API",
    "Застосувати всі набуті знання",
    "Підсумувати матеріал курсу",
    "Планувати подальше навчання"
  ],
  
  estimatedTime: 150,
  prerequisites: ["lesson-11-1"],
  isProject: true,
  isFinalProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд фінального проекту",
        content: `Ми створимо **Todo API** — повноцінний REST API для управління завданнями.

**Функціональність:**
- Створення завдань
- Отримання списку завдань
- Оновлення завдань
- Видалення завдань
- Фільтрація за статусом
- Пошук завдань

**Технології:**
- FastAPI
- Pydantic для валідації
- Роутери для організації
- Обробка помилок
- Автоматична документація`
      },
      {
        title: "Структура проекту",
        content: `**Організація файлів:**

\`\`\`
project/
├── main.py          # Головний файл
├── models.py        # Pydantic моделі
├── routers/
│   └── todos.py     # Роутер для завдань
└── database.py      # Сховище (замість БД)
\`\`\`

**Моделі:**

\`\`\`python
class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: str
\`\`\``
      },
      {
        title: "Реалізація API",
        content: `**Повний CRUD:**

\`\`\`python
@router.get("/")
def get_todos(completed: Optional[bool] = None):
    todos = todos_db
    if completed is not None:
        todos = [t for t in todos if t["completed"] == completed]
    return {"todos": todos, "total": len(todos)}

@router.post("/", status_code=201)
def create_todo(todo: TodoCreate):
    # Створення...
    return new_todo

@router.put("/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate):
    # Оновлення...
    return updated_todo

@router.delete("/{todo_id}")
def delete_todo(todo_id: int):
    # Видалення...
    return {"message": "Видалено"}
\`\`\`

**Фільтрація та пошук:**

\`\`\`python
@router.get("/search")
def search_todos(q: str):
    results = [t for t in todos_db if q.lower() in t["title"].lower()]
    return {"results": results}
\`\`\``
      },
      {
        title: "Підсумки курсу",
        content: `**Що ми вивчили:**

**Модуль 1-2:** Базові поняття Python
- Змінні, типи даних, оператори
- Умовні оператори, цикли
- Функції, модулі

**Модуль 3:** Колекції даних
- Списки, словники, множини
- Робота з рядками

**Модуль 4-5:** Поглиблене програмування
- Функції, класи, ООП
- Обробка помилок, файли

**Модуль 6-7:** Веб-розробка
- Flask для веб-додатків
- Шаблони, форми

**Модуль 8:** GUI
- Tkinter для графічних інтерфейсів

**Модуль 9:** Ігри
- Pygame для створення ігор

**Модуль 10-11:** Backend
- HTTP-запити, API
- FastAPI для створення backend

**Досягнення:**
- ✅ Основи Python
- ✅ Об'єктно-орієнтоване програмування
- ✅ Веб-розробка
- ✅ GUI додатки
- ✅ Ігри
- ✅ Backend розробка`
      },
      {
        title: "Подальше навчання",
        content: `**Рекомендації:**

1. **Бази даних**
   - SQLite, PostgreSQL
   - ORM (SQLAlchemy)
   - Робота з даними

2. **Тестування**
   - pytest
   - Unit тести
   - Integration тести

3. **Deployment**
   - Docker
   - Cloud платформи
   - CI/CD

4. **Поглиблене вивчення**
   - Асинхронне програмування
   - Мікросервіси
   - Machine Learning

5. **Практика**
   - Створюйте проекти
   - Участь у open source
   - Вирішуйте задачі на LeetCode

**Ресурси:**
- Офіційна документація Python
- FastAPI документація
- GitHub для проектів
- Stack Overflow для питань`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Повний Todo API",
      code: `from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

app = FastAPI(title="Todo API", version="1.0.0")
router = APIRouter(prefix="/todos", tags=["todos"])

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

todos_db = []
next_id = 1

@router.get("/")
def get_todos(completed: Optional[bool] = None):
    todos = todos_db
    if completed is not None:
        todos = [t for t in todos if t["completed"] == completed]
    return {"todos": todos, "total": len(todos)}

@router.post("/", status_code=201)
def create_todo(todo: TodoCreate):
    global next_id
    new_todo = {
        "id": next_id,
        "title": todo.title,
        "description": todo.description,
        "completed": False,
        "created_at": datetime.now().isoformat()
    }
    todos_db.append(new_todo)
    next_id += 1
    return new_todo

@router.get("/{todo_id}")
def get_todo(todo_id: int):
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(404, "Завдання не знайдено")
    return todo

@router.put("/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate):
    todo_to_update = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo_to_update:
        raise HTTPException(404, "Завдання не знайдено")
    
    update_data = todo.dict(exclude_unset=True)
    todo_to_update.update(update_data)
    return todo_to_update

@router.delete("/{todo_id}")
def delete_todo(todo_id: int):
    global todos_db
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(404, "Завдання не знайдено")
    todos_db = [t for t in todos_db if t["id"] != todo_id]
    return {"message": "Завдання видалено"}

app.include_router(router)`,
      explanation: "Повноцінний REST API для управління завданнями з усіма CRUD операціями."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не організувати код правильно",
      explanation: "Весь код в одному файлі робить проект важким для підтримки.",
      correctApproach: "Використовуйте роутери та окремі модулі для організації."
    }
  ],
  
  summary: `На цьому фінальному проекті ми:

1. **Створили повноцінний REST API** — Todo API з усіма операціями
2. **Застосували всі знання** — FastAPI, Pydantic, роутинг
3. **Підсумували курс** — огляд вивченого матеріалу
4. **Планували майбутнє** — рекомендації для подальшого навчання

Вітаємо з завершенням курсу! Ви тепер маєте міцну основу в Python та можете створювати різноманітні додатки!`,
  
  practiceTask: {
    title: "Фінальний проект: Todo API",
    description: "Створіть повноцінний REST API для завдань",
    problemStatement: `Створіть FastAPI додаток, який:
1. Має модель Todo (id, title, description, completed, created_at)
2. Реалізує GET /todos — всі завдання (з фільтром за completed)
3. Реалізує GET /todos/{id} — одне завдання
4. Реалізує POST /todos — створення
5. Реалізує PUT /todos/{id} — оновлення
6. Реалізує DELETE /todos/{id} — видалення
7. Використовує роутери
8. Має валідацію через Pydantic
9. Обробляє помилки`,
    inputFormat: "HTTP запити",
    outputFormat: "JSON відповіді",
    examples: [
      {
        input: "POST /todos, GET /todos?completed=false",
        output: "Створене завдання та список незавершених",
        explanation: "API обробляє створення та фільтрацію завдань"
      }
    ],
    solution: {
      code: `from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

app = FastAPI(
    title="Todo API",
    description="API для управління завданнями",
    version="1.0.0"
)

router = APIRouter(prefix="/todos", tags=["todos"])

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: str

todos_db = []
next_id = 1

@app.get("/")
def read_root():
    return {
        "message": "Ласкаво просимо до Todo API!",
        "docs": "/docs",
        "version": "1.0.0"
    }

@router.get("/", response_model=dict)
def get_todos(completed: Optional[bool] = None):
    todos = todos_db
    if completed is not None:
        todos = [t for t in todos if t["completed"] == completed]
    return {"todos": todos, "total": len(todos)}

@router.get("/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(status_code=404, detail="Завдання не знайдено")
    return todo

@router.post("/", status_code=201, response_model=Todo)
def create_todo(todo: TodoCreate):
    global next_id
    new_todo = {
        "id": next_id,
        "title": todo.title,
        "description": todo.description,
        "completed": False,
        "created_at": datetime.now().isoformat()
    }
    todos_db.append(new_todo)
    next_id += 1
    return new_todo

@router.put("/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: TodoUpdate):
    todo_to_update = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo_to_update:
        raise HTTPException(status_code=404, detail="Завдання не знайдено")
    
    update_data = todo.dict(exclude_unset=True)
    todo_to_update.update(update_data)
    return todo_to_update

@router.delete("/{todo_id}")
def delete_todo(todo_id: int):
    global todos_db
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(status_code=404, detail="Завдання не знайдено")
    
    todos_db = [t for t in todos_db if t["id"] != todo_id]
    return {"message": "Завдання видалено", "id": todo_id}

app.include_router(router)

# Запуск: uvicorn main:app --reload`,
      explanation: "Повноцінний REST API для управління завданнями з усіма CRUD операціями, валідацією та обробкою помилок."
    },
    hints: [
      "Використовуйте APIRouter для організації",
      "Створіть Pydantic моделі для валідації",
      "Додайте фільтрацію через query параметри",
      "Обробляйте помилки через HTTPException",
      "Використовуйте response_model для документації"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що ви вивчили на цьому курсі?",
        options: ["Тільки Python", "Python, веб-розробку, GUI, ігри, backend", "Тільки веб-розробку", "Тільки backend"],
        correctAnswer: 1,
        explanation: "Курс охоплює Python, веб-розробку (Flask), GUI (Tkinter), ігри (Pygame) та backend (FastAPI)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке REST API?",
        options: ["База даних", "Архітектурний стиль для веб-сервісів", "Мова програмування", "Фреймворк"],
        correctAnswer: 1,
        explanation: "REST (Representational State Transfer) — архітектурний стиль для створення веб-сервісів."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

