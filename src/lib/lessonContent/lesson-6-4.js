/**
 * Lesson 6-4: Робота з базами даних (SQLite/SQLAlchemy)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_4 = {
  lessonId: "lesson-6-4",
  moduleId: "module-6",
  order: 4,
  title: "Робота з базами даних (SQLite/SQLAlchemy)",
  
  learningObjectives: [
    "Підключити базу даних",
    "Створити моделі даних",
    "Виконувати CRUD операції",
    "Використовувати міграції"
  ],
  
  estimatedTime: 150,
  prerequisites: ["lesson-6-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "SQLAlchemy - ORM для Python",
        content: `**ORM** (Object-Relational Mapping) — перетворення об'єктів Python в SQL.

**Встановлення:**
\`\`\`bash
pip install flask-sqlalchemy
\`\`\`

**Підключення:**
\`\`\`python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
\`\`\``
      },
      {
        title: "Створення моделей",
        content: `**Модель** — клас, який представляє таблицю в БД.

\`\`\`python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<User {self.username}>'
\`\`\`

**Створення таблиць:**
\`\`\`python
with app.app_context():
    db.create_all()
\`\`\``
      },
      {
        title: "CRUD операції",
        content: `**Create (Створення):**
\`\`\`python
user = User(username='Олександр', email='alex@example.com')
db.session.add(user)
db.session.commit()
\`\`\`

**Read (Читання):**
\`\`\`python
users = User.query.all()
user = User.query.filter_by(username='Олександр').first()
\`\`\`

**Update (Оновлення):**
\`\`\`python
user.email = 'new@example.com'
db.session.commit()
\`\`\`

**Delete (Видалення):**
\`\`\`python
db.session.delete(user)
db.session.commit()
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Модель та CRUD",
      code: `from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    
    def __repr__(self):
        return f'<Student {self.name}>'

# Створення таблиць
with app.app_context():
    db.create_all()

# CRUD
student = Student(name='Олександр', age=15)
db.session.add(student)
db.session.commit()

students = Student.query.all()`,
      explanation: "Демонструє створення моделі та базові CRUD операції."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути db.session.commit()",
      explanation: "Без commit() зміни не зберігаються в БД.",
      correctApproach: "Завжди викликайте db.session.commit() після змін."
    }
  ],
  
  summary: `SQLAlchemy дозволяє працювати з БД через Python об'єкти. Використовуйте моделі для представлення таблиць.`,
  
  practiceTask: {
    title: "Система студентів з БД",
    description: "Створіть Flask додаток з базою даних",
    problemStatement: "Створіть модель Student та реалізуйте CRUD операції через веб-інтерфейс.",
    solution: {
      code: `from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)

@app.route('/')
def index():
    students = Student.query.all()
    return render_template('index.html', students=students)

@app.route('/add', methods=['POST'])
def add():
    name = request.form['name']
    age = int(request.form['age'])
    student = Student(name=name, age=age)
    db.session.add(student)
    db.session.commit()
    return redirect('/')

with app.app_context():
    db.create_all()`,
      explanation: "Повна реалізація Flask додатку з БД."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке ORM?",
        options: ["База даних", "Object-Relational Mapping", "Мова програмування", "Фреймворк"],
        correctAnswer: 1,
        explanation: "ORM дозволяє працювати з БД через об'єкти Python."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

