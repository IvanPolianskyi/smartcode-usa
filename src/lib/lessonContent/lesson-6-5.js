/**
 * Lesson 6-5: REST API з Flask
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_5 = {
  lessonId: "lesson-6-5",
  moduleId: "module-6",
  order: 5,
  title: "REST API з Flask",
  
  learningObjectives: [
    "Створити REST API endpoints",
    "Використовувати JSON для обміну даними",
    "Реалізувати HTTP методи",
    "Додати автентифікацію (базово)"
  ],
  
  estimatedTime: 135,
  prerequisites: ["lesson-6-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке REST API?",
        content: `**REST** (Representational State Transfer) — архітектурний стиль для веб-сервісів.

**Принципи:**
- Використання HTTP методів (GET, POST, PUT, DELETE)
- JSON для обміну даними
- Статусні коди для відповідей

**Приклад:**
\`\`\`python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = [{'id': 1, 'name': 'Олександр'}]
    return jsonify(users)

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    # Створення користувача
    return jsonify({'id': 1, 'name': data['name']}), 201
\`\`\``
      },
      {
        title: "HTTP методи",
        content: `**GET** — отримання даних
**POST** — створення
**PUT** — оновлення
**DELETE** — видалення

\`\`\`python
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = {'id': user_id, 'name': 'Олександр'}
    return jsonify(user)

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    return jsonify({'id': user_id, 'name': data['name']})

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return '', 204
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: REST API",
      code: `from flask import Flask, jsonify, request

app = Flask(__name__)

users = [{'id': 1, 'name': 'Олександр'}]

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = {'id': len(users) + 1, 'name': data['name']}
    users.append(new_user)
    return jsonify(new_user), 201

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({'error': 'Not found'}), 404`,
      explanation: "Демонструє базовий REST API з Flask."
    }
  ],
  
  commonMistakes: [],
  
  summary: `REST API дозволяє обмінюватися даними між клієнтом та сервером через JSON. Використовуйте HTTP методи для різних операцій.`,
  
  practiceTask: {
    title: "REST API для студентів",
    description: "Створіть REST API з CRUD операціями",
    problemStatement: "Створіть REST API для управління студентами з методами GET, POST, PUT, DELETE.",
    solution: {
      code: `from flask import Flask, jsonify, request

app = Flask(__name__)
students = []

@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify(students)

@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.json
    student = {'id': len(students) + 1, **data}
    students.append(student)
    return jsonify(student), 201

@app.route('/api/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = next((s for s in students if s['id'] == student_id), None)
    if student:
        return jsonify(student)
    return jsonify({'error': 'Not found'}), 404`,
      explanation: "Повна реалізація REST API."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який HTTP метод використовується для створення ресурсу?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 1,
        explanation: "POST використовується для створення нового ресурсу."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

