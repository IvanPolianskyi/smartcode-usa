/**
 * Lesson 05-3: Створення власних винятків
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_3 = {
  lessonId: "lesson-05-3",
  moduleId: "module-05",
  order: 3,
  title: "Створення власних винятків",

  learningObjectives: [
    "Створювати власні класи винятків на основі Exception",
    "Піднімати винятки за допомогою raise",
    "Будувати ієрархію доменних винятків",
    "Використовувати raise from для ланцюжка причин помилки",
    "Документувати кастомні винятки через docstring"
  ],

  prerequisites: ["lesson-05-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Навіщо потрібні власні винятки?",
        content: `Стандартні типи (\`ValueError\`, \`TypeError\`…) універсальні, але в реальних програмах зручніше мати **імена з вашої предметної області**.

**Приклади з життя:**

- \`InsufficientFundsError\` - недостатньо коштів на рахунку
- \`InvalidEmailError\` - некоректний email
- \`BookAlreadyExistsError\` - книга вже в каталозі

**Переваги:**

1. Код читається як бізнес-мова
2. Можна ловити саме «ваші» помилки, не змішуючи з чужими ValueError
3. Легше будувати ієрархію (базовий \`AppError\` + конкретні нащадки)
4. Зручніше тестувати й документувати API

\`\`\`python
# Менш зрозуміло
raise ValueError("Недостатньо коштів")

# Зрозуміліше для банківської логіки
raise InsufficientFundsError("Недостатньо коштів")
\`\`\``
      },
      {
        title: "Створення класу винятку",
        content: `Мінімальний власний виняток - клас, що наслідує \`Exception\`:

\`\`\`python
class AgeError(Exception):
    """Помилка, пов’язана з віком користувача."""
    pass
\`\`\`

**З повідомленням за замовчуванням або додатковими полями:**

\`\`\`python
class AgeError(Exception):
    def __init__(self, age, message="Некоректний вік"):
        self.age = age
        self.message = message
        super().__init__(f"{message}: {age}")
\`\`\`

**Використання:**

\`\`\`python
raise AgeError(-3)
# AgeError: Некоректний вік: -3

raise AgeError(150, "Вік занадто великий")
\`\`\`

Завжди наслідуйте від \`Exception\` (або від вашого базового доменного класу), а не від \`BaseException\`.`
      },
      {
        title: "raise - підняття винятку",
        content: `Ключове слово \`raise\` створює (або повторно кидає) виняток.

\`\`\`python
def set_age(age):
    if age < 0:
        raise AgeError("Вік не може бути від'ємним")
    if age > 120:
        raise AgeError("Вік занадто великий")
    return age
\`\`\`

**Варіанти raise:**

\`\`\`python
raise AgeError("Повідомлення")     # новий виняток
raise AgeError()                   # без тексту (краще з текстом)
raise                              # повторно кинути поточний (лише в except)
\`\`\`

**Повторний raise:**

\`\`\`python
try:
    risky()
except AgeError:
    print("Логуємо помилку віку")
    raise  # прокидаємо далі
\`\`\`

Піднімайте винятки **рано** (fail fast), щойно виявили некоректний стан.`
      },
      {
        title: "Ієрархія винятків",
        content: `Зручно мати базовий клас модуля і конкретні нащадки:

\`\`\`python
class ValidationError(Exception):
    """Базовий виняток валідації."""
    pass

class AgeValidationError(ValidationError):
    """Помилка валідації віку."""
    pass

class EmailValidationError(ValidationError):
    """Помилка валідації email."""
    pass
\`\`\`

**Перевага ієрархії:**

\`\`\`python
try:
    register_user(name, age, email)
except AgeValidationError as e:
    print(f"Вік: {e}")
except EmailValidationError as e:
    print(f"Email: {e}")
except ValidationError as e:
    print(f"Інша валідація: {e}")
\`\`\`

Можна обробити конкретику або одним блоком спіймати **усі** помилки валідації через базовий клас.

**Правило:** називайте базовий клас коротко і ясно (\`BankError\`, \`ParseError\`), нащадків - описово.`
      },
      {
        title: "raise from - ланцюжок причин",
        content: `Іноді внутрішня помилка (наприклад, \`ValueError\`) має стати вашою доменною. \`raise ... from ...\` зберігає причину:

\`\`\`python
class ConfigError(Exception):
    pass

def load_port(text):
    try:
        return int(text)
    except ValueError as e:
        raise ConfigError("Порт має бути цілим числом") from e
\`\`\`

У traceback буде видно:

- \`ConfigError\` - що сталося на рівні вашої логіки
- \`ValueError\` - першопричина

**raise from None** - навпаки, приховати внутрішню причину (використовуйте рідко):

\`\`\`python
raise ConfigError("Невірний порт") from None
\`\`\`

Для навчальних і більшості прикладних задач віддавайте перевагу \`raise NewError(...) from e\`.`
      },
      {
        title: "Документація та стиль",
        content: `**Домовленість іменування:** суфікс \`Error\` (\`NotFoundError\`, \`PermissionError\` у вашому модулі - з унікальним префіксом, щоб не плутати зі стандартними).

**Docstring обов’язковий для публічних винятків:**

\`\`\`python
class BookError(Exception):
    """Базовий виняток бібліотечної системи."""
    pass

class BookNotFoundError(BookError):
    """Книгу не знайдено в каталозі."""
    pass
\`\`\`

**Типовий шаблон функції:**

\`\`\`python
def add_book(title, catalog):
    """
    Додає книгу в каталог.

    Raises:
        BookError: якщо назва порожня або книга вже існує
    """
    if not title.strip():
        raise BookError("Назва не може бути порожньою")
    if title in catalog:
        raise BookError(f"Книга '{title}' вже існує")
    catalog.add(title)
\`\`\`

Так користувачі вашої функції одразу бачать, які винятки очікувати.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Простий кастомний виняток",
      code: `class AgeError(Exception):
    """Помилка віку."""
    pass

def check_age(age):
    if age < 0:
        raise AgeError("Вік не може бути від'ємним")
    print(f"Вік {age} прийнято")

try:
    check_age(-1)
except AgeError as e:
    print(f"Помилка: {e}")`,
      explanation: "Клас від Exception + raise + except з as e."
    },
    {
      title: "Ієрархія винятків",
      code: `class AppError(Exception):
    pass

class NotFoundError(AppError):
    pass

class PermissionDeniedError(AppError):
    pass

try:
    raise NotFoundError("Користувача не знайдено")
except AppError as e:
    print(f"Доменна помилка: {e}")`,
      explanation: "except AppError ловить усіх нащадків."
    },
    {
      title: "raise from",
      code: `class ParseError(Exception):
    pass

def parse_int(text):
    try:
        return int(text)
    except ValueError as e:
        raise ParseError(f"Не вдалося розібрати '{text}'") from e

try:
    parse_int("abc")
except ParseError as e:
    print(e)
    print(f"Причина: {e.__cause__}")`,
      explanation: "Зберігає ланцюжок: ParseError викликаний через ValueError."
    },
    {
      title: "Виняток з додатковими полями",
      code: `class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Потрібно {amount}, є лише {balance}"
        )

try:
    raise InsufficientFundsError(100, 250)
except InsufficientFundsError as e:
    print(e)
    print(e.balance, e.amount)`,
      explanation: "Кастомні атрибути допомагають обробити помилку програмно."
    }
  ],

  commonMistakes: [
    {
      mistake: "Наслідування від BaseException",
      explanation: "BaseException включає KeyboardInterrupt і SystemExit - їх рідко варто ловити разом із бізнес-помилками.",
      correctApproach: "Наслідуйте від Exception або від свого базового *Error."
    },
    {
      mistake: "raise рядок: raise \"помилка\"",
      explanation: "У сучасному Python так не роблять - потрібен екземпляр винятку.",
      correctApproach: "raise MyError(\"помилка\")"
    },
    {
      mistake: "Один гігантський виняток на все",
      explanation: "Без ієрархії складно реагувати по-різному на різні ситуації.",
      correctApproach: "Базовий клас + кілька конкретних нащадків за сценаріями."
    },
    {
      mistake: "Глушити кастомний виняток порожнім except Exception",
      explanation: "Тоді сенс власного типу втрачається - його ніхто не обробляє цілеспрямовано.",
      correctApproach: "except MyError as e: ... і лише потім загальний Exception за потреби."
    }
  ],

  summary: `На цьому уроці ми навчилися створювати власні винятки:

1. class MyError(Exception) - мінімальний шаблон
2. raise - підняття доменної помилки
3. Ієрархія - базовий клас і конкретні нащадки
4. raise from - збереження першопричини
5. Docstring і іменування з суфіксом Error

Далі - assert і валідація даних.`,

  practiceTask: {
    title: "Валідація віку з AgeError",
    description: "Створіть власний виняток і функцію перевірки віку",
    problemStatement: `1. Створіть клас AgeError(Exception)
2. Напишіть функцію check_age(age):
   - якщо age < 0 - raise AgeError("Вік не може бути від'ємним")
   - якщо age > 120 - raise AgeError("Вік занадто великий")
   - інакше виведіть: Вік {age} прийнято
3. Зчитайте n, потім n цілих чисел (вік). Для кожного викличте check_age у try/except.
4. При AgeError виведіть: Помилка: {повідомлення}`,
    outputFormat: `Вік 25 прийнято
Помилка: Вік не може бути від'ємним
Помилка: Вік занадто великий`,
    examples: [
      {
        input: `3
25
-5
150`,
        output: `Вік 25 прийнято
Помилка: Вік не може бути від'ємним
Помилка: Вік занадто великий`,
        explanation: "Успіх, від’ємний вік, занадто великий вік"
      },
      {
        input: `2
0
120`,
        output: `Вік 0 прийнято
Вік 120 прийнято`,
        explanation: "Межові значення 0 і 120 допустимі"
      },
      {
        input: `2
121
-1`,
        output: `Помилка: Вік занадто великий
Помилка: Вік не може бути від'ємним`,
        explanation: "Обидва значення поза діапазоном"
      }
    ],
    solution: {
      code: `class AgeError(Exception):
    pass

def check_age(age):
    if age < 0:
        raise AgeError("Вік не може бути від'ємним")
    if age > 120:
        raise AgeError("Вік занадто великий")
    print(f"Вік {age} прийнято")

n = int(input())
for _ in range(n):
    age = int(input())
    try:
        check_age(age)
    except AgeError as e:
        print(f"Помилка: {e}")`,
      explanation: "Кастомний AgeError піднімається у check_age і ловиться в циклі."
    },
    hints: [
      "class AgeError(Exception): pass",
      "Перевіряйте спочатку age < 0, потім age > 120",
      "Зчитайте n і цикл for _ in range(n)",
      "except AgeError as e: print(f\"Помилка: {e}\")"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Від якого класу зазвичай наслідують власні винятки?",
        options: ["object", "Exception", "BaseException", "Error"],
        correctAnswer: 1,
        explanation: "Стандартна практика - наслідувати від Exception."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить оператор raise MyError(\"текст\")?",
        options: [
          "Піднімає виняток MyError",
          "Друкує текст",
          "Ігнорує помилку",
          "Створює функцію"
        ],
        correctAnswer: 0,
        explanation: "raise створює й піднімає вказаний виняток."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться?\n\n```python\nclass E(Exception):\n    pass\n\ntry:\n    raise E(\"oops\")\nexcept E as e:\n    print(e)\n```",
        options: ["Надрукує oops", "Програма впаде", "Нічого", "SyntaxError"],
        correctAnswer: 0,
        explanation: "Виняток перехоплено; print(e) виводить повідомлення."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "raise NewError(\"...\") from e зберігає першопричину в __cause__.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Це саме призначення raise from."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо будувати ієрархію винятків?",
        options: [
          "Щоб ловити групи пов’язаних помилок через базовий клас",
          "Щоб прискорити Python",
          "Щоб уникнути функцій",
          "Це обов’язково для синтаксису"
        ],
        correctAnswer: 0,
        explanation: "Базовий клас дозволяє обробляти всіх нащадків одним except."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка назва найкраща для винятку «недостатньо коштів»?",
        options: [
          "InsufficientFundsError",
          "error1",
          "Exception2",
          "problem"
        ],
        correctAnswer: 0,
        explanation: "Описова назва з суфіксом Error - прийнятий стиль."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У сучасному Python коректно писати raise \"просто рядок\".",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Потрібен екземпляр класу винятку."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
