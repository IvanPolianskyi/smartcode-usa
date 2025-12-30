/**
 * Lesson 6-3: Форми та обробка даних
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_3 = {
  lessonId: "lesson-6-3",
  moduleId: "module-6",
  order: 3,
  title: "Форми та обробка даних",
  
  learningObjectives: [
    "Створювати HTML форми",
    "Обробляти GET та POST запити",
    "Валідувати дані",
    "Використовувати Flask-WTF"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-6-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "GET та POST запити",
        content: `**GET** — отримання даних (за замовчуванням)
**POST** — відправка даних

\`\`\`python
from flask import Flask, request

app = Flask(__name__)

@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        name = request.form['name']
        return f'Привіт, {name}!'
    return '''
    <form method="POST">
        <input name="name" placeholder="Ім'я">
        <button type="submit">Відправити</button>
    </form>
    '''
\`\`\``
      },
      {
        title: "Flask-WTF для форм",
        content: `**Встановлення:**
\`\`\`bash
pip install flask-wtf
\`\`\`

**Використання:**
\`\`\`python
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class MyForm(FlaskForm):
    name = StringField('Ім\'я', validators=[DataRequired()])
    submit = SubmitField('Відправити')
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Обробка форми",
      code: `from flask import Flask, request, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        return f'Дякуємо, {name}! Ваше повідомлення отримано.'
    return render_template('contact.html')`,
      explanation: "Демонструє обробку GET та POST запитів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути вказати methods=['POST']",
      explanation: "Без methods=['POST'] форма не працюватиме.",
      correctApproach: "Завжди вказуйте methods=['GET', 'POST'] для форм."
    }
  ],
  
  summary: `Форми дозволяють отримувати дані від користувачів. Використовуйте request.form для доступу до даних.`,
  
  practiceTask: {
    title: "Форма зворотного зв'язку",
    description: "Створіть форму з валідацією",
    problemStatement: "Створіть форму з полями: ім'я, email, повідомлення з валідацією.",
    solution: {
      code: `from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        
        if not name or not email:
            return 'Помилка: заповніть всі поля!'
        
        return f'Дякуємо, {name}!'
    
    return render_template('contact.html')`,
      explanation: "Базова обробка форми з валідацією."
    },
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод HTTP використовується для відправки форм?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 1,
        explanation: "POST використовується для відправки даних форми."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

