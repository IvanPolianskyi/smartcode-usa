/**
 * Lesson 6-2: Шаблони (Templates) та Jinja2
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_2 = {
  lessonId: "lesson-6-2",
  moduleId: "module-6",
  order: 2,
  title: "Шаблони (Templates) та Jinja2",
  
  learningObjectives: [
    "Створювати HTML шаблони",
    "Використовувати Jinja2 синтаксис",
    "Передавати дані у шаблони",
    "Створювати базові шаблони"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-6-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке шаблони?",
        content: `**Шаблони** — HTML файли з динамічним контентом.

**Переваги:**
- Розділення логіки та презентації
- Повторне використання коду
- Легше підтримувати

**Структура:**
\`\`\`
app/
├── app.py
└── templates/
    └── index.html
\`\`\`

**Використання:**
\`\`\`python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', name='Олександр')
\`\`\``
      },
      {
        title: "Jinja2 синтаксис",
        content: `**Змінні:**
\`\`\`html
<h1>Привіт, {{ name }}!</h1>
\`\`\`

**Умови:**
\`\`\`html
{% if user %}
    <p>Привіт, {{ user }}!</p>
{% else %}
    <p>Гість</p>
{% endif %}
\`\`\`

**Цикли:**
\`\`\`html
<ul>
{% for item in items %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
\`\`\`

**Фільтри:**
\`\`\`html
{{ name|upper }}
{{ text|capitalize }}
{{ items|length }}
\`\`\``
      },
      {
        title: "Базові шаблони (Template Inheritance)",
        content: `**base.html** (базовий шаблон):
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}Мій сайт{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
\`\`\`

**index.html** (дочірній шаблон):
\`\`\`html
{% extends "base.html" %}

{% block title %}Головна{% endblock %}

{% block content %}
<h1>Ласкаво просимо!</h1>
{% endblock %}
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Використання шаблонів",
      code: `# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    students = ['Олександр', 'Марія', 'Дмитро']
    return render_template('index.html', 
                          title='Студенти',
                          students=students)

# templates/index.html
<!DOCTYPE html>
<html>
<head><title>{{ title }}</title></head>
<body>
    <h1>{{ title }}</h1>
    <ul>
    {% for student in students %}
        <li>{{ student }}</li>
    {% endfor %}
    </ul>
</body>
</html>`,
      explanation: "Демонструє базове використання шаблонів з Jinja2."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути створити папку templates",
      explanation: "Flask шукає шаблони в папці templates.",
      correctApproach: "Створіть папку templates/ в корені проекту."
    }
  ],
  
  summary: `Шаблони дозволяють розділити HTML та Python код. Jinja2 надає потужний синтаксис для динамічного контенту.`,
  
  practiceTask: {
    title: "Створення шаблонів",
    description: "Створіть Flask додаток з шаблонами",
    problemStatement: "Створіть базовий шаблон та сторінки з використанням Jinja2.",
    solution: {
      code: `# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html', name='Олександр')

# templates/base.html
<!DOCTYPE html>
<html>
<head><title>{% block title %}Сайт{% endblock %}</title></head>
<body>{% block content %}{% endblock %}</body>
</html>

# templates/home.html
{% extends "base.html" %}
{% block content %}
<h1>Привіт, {{ name }}!</h1>
{% endblock %}`,
      explanation: "Демонстрація базових шаблонів."
    },
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка функція Flask використовується для рендерингу шаблонів?",
        options: ["render()", "render_template()", "template()", "html()"],
        correctAnswer: 1,
        explanation: "render_template() використовується для рендерингу HTML шаблонів."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

