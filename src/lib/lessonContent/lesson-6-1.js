/**
 * Lesson 6-1: Вступ до Flask та перший веб-додаток
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_1 = {
  lessonId: "lesson-6-1",
  moduleId: "module-6",
  order: 1,
  title: "Вступ до Flask та перший веб-додаток",
  
  learningObjectives: [
    "Встановити Flask",
    "Створити перший веб-додаток",
    "Розуміти маршрутизацію",
    "Використовувати декоратори для маршрутів"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-5-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке Flask?",
        content: `**Flask** — легкий веб-фреймворк для Python, який дозволяє швидко створювати веб-додатки.

**Переваги Flask:**
- Простий та зрозумілий
- Гнучкий — вибираєте, що потрібно
- Легкий для початківців
- Підтримує розширення

**Встановлення:**
\`\`\`bash
pip install flask
\`\`\`

**Перший додаток:**
\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Привіт, світ!</h1>'

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

**Запуск:**
\`\`\`bash
python app.py
\`\`\`

Відкрийте браузер: http://127.0.0.1:5000`
      },
      {
        title: "Маршрутизація (Routes)",
        content: `**@app.route()** — декоратор, який визначає URL маршрут.

\`\`\`python
@app.route('/')
def home():
    return 'Головна сторінка'

@app.route('/about')
def about():
    return 'Про нас'

@app.route('/contact')
def contact():
    return 'Контакти'
\`\`\`

**Динамічні маршрути:**
\`\`\`python
@app.route('/user/<name>')
def user(name):
    return f'Привіт, {name}!'

@app.route('/post/<int:post_id>')
def post(post_id):
    return f'Пост #{post_id}'
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий Flask додаток",
      code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Ласкаво просимо!</h1>'

@app.route('/hello')
def hello():
    return '<h2>Привіт з Flask!</h2>'

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: "Базовий Flask додаток з двома маршрутами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути app.run()",
      explanation: "Без app.run() сервер не запуститься.",
      correctApproach: "Завжди викликайте app.run() в блоці if __name__ == '__main__'."
    }
  ],
  
  summary: `Flask — простий веб-фреймворк для Python. Використовуйте @app.route() для створення маршрутів.`,
  
  practiceTask: {
    title: "Перший веб-додаток",
    description: "Створіть Flask додаток з кількома сторінками",
    problemStatement: "Створіть Flask додаток з маршрутами: /, /about, /contact, /user/<name>.",
    solution: {
      code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Головна</h1><p>Ласкаво просимо!</p>'

@app.route('/about')
def about():
    return '<h1>Про нас</h1><p>Ми навчаємо Python!</p>'

@app.route('/contact')
def contact():
    return '<h1>Контакти</h1><p>Email: info@example.com</p>'

@app.route('/user/<name>')
def user(name):
    return f'<h1>Привіт, {name}!</h1>'

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: "Повний Flask додаток з кількома маршрутами."
    },
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке Flask?",
        options: ["База даних", "Веб-фреймворк", "Мова програмування", "Редактор коду"],
        correctAnswer: 1,
        explanation: "Flask — це веб-фреймворк для Python."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

