/**
 * Lesson 6-6: Модуль 6: Практичний проект - Веб-додаток з API
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_6 = {
  lessonId: "lesson-6-6",
  moduleId: "module-6",
  order: 6,
  title: "Модуль 6: Практичний проект - Веб-додаток з API",
  
  learningObjectives: [
    "Створити повноцінний веб-додаток",
    "Реалізувати REST API",
    "Підключити базу даних",
    "Деплоїти проект"
  ],
  
  estimatedTime: 240,
  prerequisites: ["lesson-6-5"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `Створимо повноцінний веб-додаток з:
- Веб-інтерфейсом (HTML/CSS)
- REST API
- Базою даних (SQLite)
- CRUD операціями

**Функціонал:**
- Додавання студентів
- Перегляд списку
- Оновлення даних
- Видалення
- REST API для всіх операцій`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Структура проекту",
      code: `app/
├── app.py
├── models.py
├── templates/
│   ├── base.html
│   └── index.html
└── static/
    └── style.css`,
      explanation: "Структура Flask проекту."
    }
  ],
  
  commonMistakes: [],
  
  summary: `Проект об'єднує всі навички: Flask, шаблони, БД, REST API.`,
  
  practiceTask: {
    title: "Веб-додаток управління студентами",
    description: "Створіть повноцінний веб-додаток",
    problemStatement: "Створіть веб-додаток з веб-інтерфейсом та REST API для управління студентами.",
    solution: {
      code: `from flask import Flask, render_template, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    course = db.Column(db.String(50))

@app.route('/')
def index():
    students = Student.query.all()
    return render_template('index.html', students=students)

@app.route('/api/students', methods=['GET'])
def api_get_students():
    students = Student.query.all()
    return jsonify([{'id': s.id, 'name': s.name, 'age': s.age} for s in students])

@app.route('/api/students', methods=['POST'])
def api_create_student():
    data = request.json
    student = Student(name=data['name'], age=data['age'], course=data.get('course'))
    db.session.add(student)
    db.session.commit()
    return jsonify({'id': student.id}), 201

with app.app_context():
    db.create_all()`,
      explanation: "Повна реалізація веб-додатку з API."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що об'єднує фінальний проект?",
        options: ["Тільки HTML", "Всі навички модуля", "Тільки API", "Тільки БД"],
        correctAnswer: 1,
        explanation: "Фінальний проект об'єднує всі навички модуля."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

