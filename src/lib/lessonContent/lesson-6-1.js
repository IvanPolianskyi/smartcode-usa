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

**Що таке веб-фреймворк?**
Веб-фреймворк — це набір інструментів та бібліотек, які спрощують створення веб-додатків. Замість того, щоб писати все з нуля, ви використовуєте готові компоненти.

**Переваги Flask:**
- **Простий та зрозумілий** — мінімальний синтаксис, легко навчитися
- **Гнучкий** — вибираєте, які компоненти потрібні
- **Легкий для початківців** — не перевантажений складністю
- **Підтримує розширення** — можна додавати потрібний функціонал
- **Легкий** — не потребує багато ресурсів
- **Активна спільнота** — багато документації та прикладів

**Коли використовувати Flask:**
- Невеликі та середні веб-додатки
- API (RESTful сервіси)
- Прототипування
- Навчання веб-розробці
- Мікросервіси

**Встановлення Flask:**
\`\`\`bash
pip install flask
\`\`\`

**Перевірка встановлення:**
\`\`\`bash
python -c "import flask; print(flask.__version__)"
\`\`\`

Ви повинні побачити версію Flask (наприклад, 2.3.0).`
      },
      {
        title: "Перший Flask додаток",
        content: `Створіть файл \`app.py\` з наступним кодом:

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Привіт, світ!</h1>'

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

**Розбір коду:**

1. **\`from flask import Flask\`** — імпортуємо клас Flask
2. **\`app = Flask(__name__)\`** — створюємо екземпляр додатку
   - \`__name__\` — назва поточного модуля
   - Flask використовує це для знаходження ресурсів
3. **\`@app.route('/')\`** — декоратор, який визначає URL маршрут
   - \`/\` — це головна сторінка (корінь сайту)
4. **\`def home():\`** — функція, яка обробляє запит
   - Повертає HTML, який відображається в браузері
5. **\`if __name__ == '__main__':\`** — запускає сервер тільки якщо файл запущено напряму
6. **\`app.run(debug=True)\`** — запускає сервер у режимі налагодження

**Запуск додатку:**

\`\`\`bash
python app.py
\`\`\`

Ви побачите:
\`\`\`
 * Running on http://127.0.0.1:5000
 * Debug mode: on
\`\`\`

**Відкрийте браузер:**
Перейдіть за адресою: http://127.0.0.1:5000

Ви побачите "Привіт, світ!" на сторінці.

**Режим налагодження (debug=True):**
- Автоматичне перезавантаження при зміні коду
- Детальні повідомлення про помилки
- **Увага:** Не використовуйте debug=True у продакшені!`
      },
      {
        title: "Маршрутизація (Routes)",
        content: `**Маршрут (route)** — це URL, який відповідає певній функції.

**Базові маршрути:**

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

Тепер:
- http://127.0.0.1:5000/ → "Головна сторінка"
- http://127.0.0.1:5000/about → "Про нас"
- http://127.0.0.1:5000/contact → "Контакти"

**HTTP методи:**

За замовчуванням маршрути приймають тільки GET запити. Можна вказати інші:

\`\`\`python
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        return 'Дані відправлено!'
    return 'Форма відправки'
\`\`\`

**Динамічні маршрути:**

Можна передавати змінні через URL:

\`\`\`python
@app.route('/user/<name>')
def user(name):
    return f'Привіт, {name}!'

# http://127.0.0.1:5000/user/Олександр → "Привіт, Олександр!"
\`\`\`

**Типи конвертерів:**

\`\`\`python
@app.route('/post/<int:post_id>')
def post(post_id):
    return f'Пост #{post_id}'

@app.route('/price/<float:price>')
def show_price(price):
    return f'Ціна: {price} грн'

@app.route('/path/<path:subpath>')
def show_path(subpath):
    return f'Шлях: {subpath}'
\`\`\`

**Доступні конвертери:**
- \`string\` (за замовчуванням) — приймає текст
- \`int\` — ціле число
- \`float\` — дійсне число
- \`path\` — шлях (може містити слеші)
- \`uuid\` — UUID формат`
      },
      {
        title: "Декоратори та функції обробки",
        content: `**Декоратор @app.route():**

Декоратор — це спеціальна функція, яка змінює поведінку іншої функції. \`@app.route()\` реєструє функцію як обробник для певного URL.

\`\`\`python
@app.route('/hello')
def hello():
    return 'Привіт!'
\`\`\`

Це еквівалентно:
\`\`\`python
def hello():
    return 'Привіт!'

hello = app.route('/hello')(hello)
\`\`\`

**Повернення значень:**

Функція обробки може повертати:
- **Рядок** — відображається як HTML
- **Словник** — автоматично конвертується в JSON
- **Кортеж** — (response, status_code) або (response, headers)
- **Response об'єкт** — для повного контролю

\`\`\`python
@app.route('/json')
def json_data():
    return {'name': 'Олександр', 'age': 15}

@app.route('/error')
def error():
    return 'Помилка!', 404  # Статус код 404

@app.route('/custom')
def custom():
    from flask import Response
    return Response('Custom response', mimetype='text/plain')
\`\`\``
      },
      {
        title: "Структура Flask проекту",
        content: `**Базова структура:**

\`\`\`
my_app/
├── app.py          # Головний файл додатку
├── templates/      # HTML шаблони (пізніше)
├── static/         # CSS, JS, зображення (пізніше)
└── requirements.txt # Залежності проекту
\`\`\`

**requirements.txt:**

\`\`\`
Flask==2.3.0
\`\`\`

**Встановлення залежностей:**

\`\`\`bash
pip install -r requirements.txt
\`\`\`

**Приклад повного додатку:**

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '''
    <html>
        <head><title>Мій сайт</title></head>
        <body>
            <h1>Ласкаво просимо!</h1>
            <p><a href="/about">Про нас</a></p>
            <p><a href="/contact">Контакти</a></p>
        </body>
    </html>
    '''

@app.route('/about')
def about():
    return '<h1>Про нас</h1><p>Ми навчаємо Python!</p>'

@app.route('/contact')
def contact():
    return '<h1>Контакти</h1><p>Email: info@example.com</p>'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
\`\`\`

**Параметри app.run():**
- \`debug=True\` — режим налагодження
- \`host='0.0.0.0'\` — доступ з будь-якої IP адреси
- \`port=5000\` — порт сервера (за замовчуванням 5000)`
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
    return '<h1>Ласкаво просимо!</h1><p>Це мій перший Flask додаток</p>'

@app.route('/hello')
def hello():
    return '<h2>Привіт з Flask!</h2>'

@app.route('/info')
def info():
    return '''
    <h1>Інформація</h1>
    <ul>
        <li>Flask версія: 2.3.0</li>
        <li>Python версія: 3.11</li>
    </ul>
    '''

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: "Базовий Flask додаток з трьома маршрутами. Демонструє створення простих HTML сторінок."
    },
    {
      title: "Приклад 2: Динамічні маршрути",
      code: `from flask import Flask

app = Flask(__name__)

@app.route('/user/<name>')
def user(name):
    return f'<h1>Привіт, {name}!</h1><p>Ласкаво просимо на наш сайт!</p>'

@app.route('/post/<int:post_id>')
def post(post_id):
    return f'<h1>Пост #{post_id}</h1><p>Тут буде вміст поста</p>'

@app.route('/price/<float:price>')
def price(price):
    return f'<h1>Ціна: {price} грн</h1>'

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: "Демонструє використання динамічних маршрутів з різними типами конвертерів (string, int, float)."
    },
    {
      title: "Приклад 3: JSON відповіді",
      code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/user')
def api_user():
    return {
        'name': 'Олександр',
        'age': 15,
        'city': 'Київ'
    }

@app.route('/api/users')
def api_users():
    users = [
        {'id': 1, 'name': 'Олександр', 'age': 15},
        {'id': 2, 'name': 'Марія', 'age': 16},
        {'id': 3, 'name': 'Дмитро', 'age': 14}
    ]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: "Показує, як повертати JSON дані з Flask додатку. jsonify() форматує словник у JSON відповідь."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути app.run() або запустити його неправильно",
      explanation: "Без app.run() сервер не запуститься. Також не запускайте app.run() без перевірки __name__ == '__main__', інакше сервер запуститься двічі при імпорті.",
      correctApproach: "Завжди використовуйте: if __name__ == '__main__': app.run(debug=True)"
    },
    {
      mistake: "Використання debug=True у продакшені",
      explanation: "debug=True показує детальні помилки та дозволяє виконувати код, що небезпечно для публічних сайтів.",
      correctApproach: "Використовуйте debug=True тільки під час розробки. У продакшені встановіть debug=False."
    },
    {
      mistake: "Плутанина між одинарними та подвійними слешами в URL",
      explanation: "/user/name та /user/name/ — це різні маршрути. Flask не додає слеш автоматично.",
      correctApproach: "Будьте уважні зі слешами. Використовуйте @app.route('/user/<name>') для /user/Олександр."
    },
    {
      mistake: "Забути імпортувати Flask",
      explanation: "from flask import Flask має бути на початку файлу, інакше виникне NameError.",
      correctApproach: "Завжди додавайте from flask import Flask на початку файлу."
    },
    {
      mistake: "Неправильне використання динамічних маршрутів",
      explanation: "Якщо не вказати тип конвертера, змінна буде рядком. Для чисел використовуйте <int:> або <float:>.",
      correctApproach: "Використовуйте @app.route('/post/<int:post_id>') для чисел, а не @app.route('/post/<post_id>')."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Flask** — легкий веб-фреймворк для Python
2. **Встановлення** — pip install flask
3. **Створення додатку** — app = Flask(__name__)
4. **Маршрутизація** — @app.route('/path') для створення URL маршрутів
5. **Динамічні маршрути** — /user/<name>, /post/<int:id> з конвертерами типів
6. **Запуск сервера** — app.run(debug=True) у режимі налагодження
7. **JSON відповіді** — повернення словників або використання jsonify()

Flask дозволяє швидко створювати веб-додатки та API. Це лише початок — далі ми вивчимо шаблони, форми та багато іншого!`,
  
  practiceTask: {
    title: "Перший веб-додаток",
    description: "Створіть Flask додаток з кількома сторінками та динамічними маршрутами",
    problemStatement: `Створіть Flask додаток, який:
1. Має головну сторінку (/) з привітанням
2. Має сторінку "Про нас" (/about) з інформацією
3. Має сторінку "Контакти" (/contact) з контактними даними
4. Має динамічний маршрут /user/<name> для привітання користувача
5. Має маршрут /post/<int:post_id> для відображення поста за ID
6. Має API маршрут /api/info, який повертає JSON з інформацією про додаток`,
    inputFormat: "Додаток працює через браузер, переходите за різними URL",
    outputFormat: `Приклад виведення:
- http://127.0.0.1:5000/ → Головна сторінка
- http://127.0.0.1:5000/about → Про нас
- http://127.0.0.1:5000/user/Олександр → Привіт, Олександр!
- http://127.0.0.1:5000/post/5 → Пост #5
- http://127.0.0.1:5000/api/info → JSON з інформацією`,
    examples: [
      {
        input: "Відкрити http://127.0.0.1:5000/user/Марія",
        output: "Привіт, Марія!",
        explanation: "Динамічний маршрут підставляє ім'я з URL у відповідь"
      },
      {
        input: "Відкрити http://127.0.0.1:5000/post/42",
        output: "Пост #42",
        explanation: "Маршрут з конвертером int приймає тільки цілі числа"
      }
    ],
    solution: {
      code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <html>
        <head><title>Мій сайт</title></head>
        <body>
            <h1>Головна</h1>
            <p>Ласкаво просимо на мій перший Flask додаток!</p>
            <nav>
                <a href="/about">Про нас</a> | 
                <a href="/contact">Контакти</a>
            </nav>
        </body>
    </html>
    '''

@app.route('/about')
def about():
    return '''
    <html>
        <head><title>Про нас</title></head>
        <body>
            <h1>Про нас</h1>
            <p>Ми навчаємо Python та веб-розробці!</p>
            <p><a href="/">На головну</a></p>
        </body>
    </html>
    '''

@app.route('/contact')
def contact():
    return '''
    <html>
        <head><title>Контакти</title></head>
        <body>
            <h1>Контакти</h1>
            <p>Email: info@example.com</p>
            <p>Телефон: +380 12 345 67 89</p>
            <p><a href="/">На головну</a></p>
        </body>
    </html>
    '''

@app.route('/user/<name>')
def user(name):
    return f'''
    <html>
        <head><title>Привіт, {name}!</title></head>
        <body>
            <h1>Привіт, {name}!</h1>
            <p>Ласкаво просимо на наш сайт!</p>
            <p><a href="/">На головну</a></p>
        </body>
    </html>
    '''

@app.route('/post/<int:post_id>')
def post(post_id):
    return f'''
    <html>
        <head><title>Пост #{post_id}</title></head>
        <body>
            <h1>Пост #{post_id}</h1>
            <p>Тут буде вміст поста з ID {post_id}</p>
            <p><a href="/">На головну</a></p>
        </body>
    </html>
    '''

@app.route('/api/info')
def api_info():
    return jsonify({
        'name': 'Мій Flask додаток',
        'version': '1.0',
        'author': 'Олександр',
        'description': 'Перший веб-додаток на Flask'
    })

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: "Повний Flask додаток з статичними та динамічними маршрутами, HTML відповідями та JSON API."
    },
    hints: [
      "Створіть файл app.py та імпортуйте Flask",
      "Використовуйте @app.route() для кожного маршруту",
      "Для динамічних маршрутів використовуйте <name> або <int:post_id>",
      "Для JSON відповіді використовуйте jsonify() або просто повертайте словник",
      "Не забудьте app.run(debug=True) в блоці if __name__ == '__main__'"
    ],
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
        explanation: "Flask — це легкий веб-фреймворк для Python, який дозволяє створювати веб-додатки."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код при відкритті http://127.0.0.1:5000/user/Олександр?\n\n```python\n@app.route('/user/<name>')\ndef user(name):\n    return f'Привіт, {name}!'\n```",
        options: ["Привіт, name!", "Привіт, Олександр!", "Помилку", "Нічого"],
        correctAnswer: 1,
        explanation: "Динамічний маршрут /user/<name> підставляє значення з URL у змінну name, тому виведе 'Привіт, Олександр!'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який конвертер потрібен для прийняття цілого числа в URL?",
        options: ["<string:id>", "<int:id>", "<number:id>", "<integer:id>"],
        correctAnswer: 1,
        explanation: "<int:id> — правильний конвертер для цілих чисел. Flask автоматично конвертує рядок у int."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо використовувати if __name__ == '__main__' перед app.run()?",
        options: ["Щоб сервер запускався швидше", "Щоб уникнути подвійного запуску при імпорті", "Щоб зберегти пам'ять", "Це не обов'язково"],
        correctAnswer: 1,
        explanation: "Без перевірки __name__ == '__main__' сервер може запуститися двічі, якщо файл імпортується як модуль."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "debug=True можна безпечно використовувати у продакшені (публічних сайтах).",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. debug=True показує детальні помилки та дозволяє виконувати код, що небезпечно для публічних сайтів. Використовуйте тільки під час розробки."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що поверне цей маршрут?\n\n```python\n@app.route('/api/data')\ndef data():\n    return {'name': 'Олександр', 'age': 15}\n```",
        options: ["HTML сторінку", "JSON відповідь", "Помилку", "Текст"],
        correctAnswer: 1,
        explanation: "Flask автоматично конвертує словник у JSON відповідь з правильними заголовками."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

