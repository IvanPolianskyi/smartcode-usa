/**
 * Lesson 06-2: Створення власних декораторів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_2 = {
  lessonId: "lesson-06-2",
  moduleId: "module-06",
  order: 2,
  title: "Створення власних декораторів",

  learningObjectives: [
    "Зберігати метадані функції за допомогою functools.wraps",
    "Писати універсальні обгортки з *args і **kwargs",
    "Створювати декоратори з аргументами (фабрики декораторів)",
    "Розуміти порядок стекування кількох декораторів"
  ],

  prerequisites: ["lesson-06-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Проблема втрати метаданих",
        content: `Після обгортання функція «забуває» своє ім'я та docstring — замість них з'являються дані \`wrapper\`.

\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@log_calls
def greet(name):
    """Вітає користувача"""
    return f"Привіт, {name}!"

print(greet.__name__)  # wrapper  ← очікували greet
print(greet.__doc__)   # None     ← docstring зник
\`\`\`

Це заважає відлагодженню, автодокументації та інструментам на кшталт \`help()\`.`
      },
      {
        title: "functools.wraps",
        content: `\`@wraps(func)\` копіює метадані оригінальної функції на обгортку.

\`\`\`python
from functools import wraps

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Виклик {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def greet(name):
    """Вітає користувача"""
    return f"Привіт, {name}!"

print(greet.__name__)  # greet
print(greet.__doc__)   # Вітає користувача
\`\`\`

**Правило курсу:** у власних декораторах майже завжди використовуйте \`@wraps(func)\` на \`wrapper\`.

\`wraps\` також зберігає \`__module__\`, \`__annotations__\` і додає \`__wrapped__\` — посилання на оригінал.`
      },
      {
        title: "*args і **kwargs у декораторах",
        content: `Універсальна обгортка приймає будь-які аргументи і передає їх далі:

\`\`\`python
from functools import wraps

def debug(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"args={args}, kwargs={kwargs}")
        return func(*args, **kwargs)
    return wrapper

@debug
def add(a, b, scale=1):
    return (a + b) * scale

print(add(2, 3))           # args=(2, 3), kwargs={}
print(add(2, 3, scale=10)) # args=(2, 3), kwargs={'scale': 10}
\`\`\`

**Пояснення:**
- \`*args\` — кортеж позиційних аргументів
- \`**kwargs\` — словник іменованих аргументів
- \`func(*args, **kwargs)\` — «розпаковує» їх назад у виклик

Без цього декоратор працював би лише з однією фіксованою сигнатурою.`
      },
      {
        title: "Декоратори з аргументами (фабрики)",
        content: `Іноді декоратору потрібні параметри: \`@repeat(3)\`, \`@retry(max_attempts=5)\`. Тоді потрібна **фабрика**: функція, яка приймає параметри і повертає справжній декоратор.

**Три рівні вкладеності:**

1. Зовнішня функція — приймає параметри (\`times\`)
2. Середня — приймає \`func\` (це і є декоратор)
3. Внутрішня \`wrapper\` — виконується при кожному виклику

\`\`\`python
from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last = None
            for _ in range(times):
                last = func(*args, **kwargs)
            return last
        return wrapper
    return decorator

@repeat(3)
def beep():
    print("Бип!")

beep()
# Бип!
# Бип!
# Бип!
\`\`\`

**Еквівалент без @:**

\`\`\`python
beep = repeat(3)(beep)
#         ↑        ↑
#    фабрика   декоратор
\`\`\`

Спочатку \`repeat(3)\` повертає \`decorator\`, потім \`decorator(beep)\` повертає \`wrapper\`.`
      },
      {
        title: "Стекування декораторів",
        content: `Кілька \`@\` застосовуються **знизу вгору** (від функції догори), а при виклику виконуються **зверху вниз**.

\`\`\`python
from functools import wraps

def bold(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"**{func(*args, **kwargs)}**"
    return wrapper

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@bold
@shout
def greet(name):
    return f"привіт, {name}"

print(greet("оля"))  # **ПРИВІТ, ОЛЯ**
\`\`\`

**Порядок застосування (при визначенні):**
1. Спочатку \`shout\` (найближчий до \`def\`)
2. Потім \`bold\`

Тобто: \`greet = bold(shout(greet))\`.

**Порядок при виклику:** спочатку зовнішній \`bold\`, всередині нього \`shout\`, потім оригінал.`
      },
      {
        title: "Практичний шаблон фабрики",
        content: `Готовий шаблон для декоратора з параметрами:

\`\`\`python
from functools import wraps

def my_decorator(option=True):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if option:
                print(f"Перед {func.__name__}")
            result = func(*args, **kwargs)
            if option:
                print(f"Після {func.__name__}")
            return result
        return wrapper
    return decorator

@my_decorator(option=True)
def work():
    print("Робота")

work()
\`\`\`

**Поради:**
- Завжди \`@wraps(func)\`
- Завжди \`return\` результат \`func\`
- Документуйте параметри фабрики
- Не змішуйте логіку параметрів і логіку \`wrapper\` без потреби — тримайте рівні чіткими`
      }
    ]
  },

  codeExamples: [
    {
      title: "wraps зберігає ім'я",
      code: `from functools import wraps

def trace(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@trace
def compute(x):
    """Обчислює квадрат"""
    return x * x

print(compute.__name__)
print(compute.__doc__)`,
      explanation: "Без @wraps ім'я було б wrapper; з wraps — compute."
    },
    {
      title: "Фабрика repeat",
      code: `from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(times):
                print(f"Спроба {i + 1}")
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(2)
def hello(name):
    print(f"Привіт, {name}!")

hello("Тарас")`,
      explanation: "repeat(2) повертає декоратор; @repeat(2) застосовує його до hello."
    },
    {
      title: "Стекування shout і add_bang",
      code: `from functools import wraps

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

def add_bang(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) + "!"
    return wrapper

@add_bang
@shout
def echo(text):
    return text

print(echo("python"))  # PYTHON!`,
      explanation: "Спочатку shout робить upper, потім add_bang додає '!'"
    },
    {
      title: "Декоратор з іменованим параметром",
      code: `from functools import wraps

def prefix(text):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(text)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@prefix("[INFO]")
def report(msg):
    print(msg)

report("Сервер запущено")`,
      explanation: "Фабрика prefix приймає рядок і повертає декоратор логування."
    }
  ],

  commonMistakes: [
    {
      mistake: "Забути викликати фабрику: написати @repeat замість @repeat(3)",
      explanation: "Без дужок Python передасть функцію в repeat як times, а не як func — структура зламається.",
      correctApproach: "Для декоратора з параметрами завжди пишіть @repeat(3) або @repeat(times=3)"
    },
    {
      mistake: "Пропустити @wraps(func)",
      explanation: "Метадані (__name__, __doc__) вказуватимуть на wrapper.",
      correctApproach: "Імпортуйте wraps і ставте @wraps(func) над def wrapper"
    },
    {
      mistake: "Неправильне розуміння порядку стекування",
      explanation: "Люди думають, що верхній @ застосовується першим при визначенні.",
      correctApproach: "Запам'ятайте: визначення знизу вгору, виклик зверху вниз. f = outer(inner(f))"
    },
    {
      mistake: "Повернути decorator замість wrapper із середини",
      explanation: "Фабрика має повернути decorator, decorator — wrapper, wrapper — результат func.",
      correctApproach: "Перевірте три return: return wrapper / return decorator / return result"
    }
  ],

  summary: `На цьому уроці ми навчилися створювати надійні власні декоратори:

1. functools.wraps — зберігає ім'я, docstring та інші метадані
2. *args/**kwargs — універсальна передача аргументів
3. Фабрики декораторів — три рівні для параметрів на кшталт @repeat(3)
4. Стекування — кілька @ застосовуються знизу вгору
5. Шаблон — wraps + wrapper + обов'язковий return результату

Далі розглянемо @property, @staticmethod, @classmethod і декоратори для класів.`,

  practiceTask: {
    title: "Стек декораторів shout і add_bang",
    description: "Створіть два декоратори з wraps і застосуйте їх разом",
    problemStatement: `Створіть два декоратори з \`functools.wraps\`:

1. **shout** — повертає результат функції у ВЕРХНЬОМУ регістрі
2. **add_bang** — додає \`!\` до результату функції

Застосуйте їх так:
\`\`\`python
@add_bang
@shout
def echo(text):
    return text
\`\`\`

Зчитайте рядок зі stdin і виведіть \`echo(text)\`.

Формат вводу:
python`,
    outputFormat: `PYTHON!`,
    examples: [
      {
        input: `python`,
        output: `PYTHON!`,
        explanation: "Спочатку shout → PYTHON, потім add_bang → PYTHON!"
      },
      {
        input: `Hello`,
        output: `HELLO!`,
        explanation: "Регістр нормалізується, додається знак оклику"
      },
      {
        input: `SmartCode`,
        output: `SMARTCODE!`,
        explanation: "Перевірка зі змішаним регістром"
      }
    ],
    solution: {
      code: `from functools import wraps

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

def add_bang(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) + "!"
    return wrapper

@add_bang
@shout
def echo(text):
    return text

text = input().strip()
print(echo(text))`,
      explanation: "echo = add_bang(shout(echo)): спочатку upper, потім '!'. wraps зберігає ім'я echo."
    },
    hints: [
      "Імпортуйте wraps: from functools import wraps",
      "Порядок: @add_bang зверху, @shout ближче до def",
      "shout має викликати .upper() на результаті",
      "add_bang додає рядок '!' до результату"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо потрібен functools.wraps?",
        options: [
          "Щоб прискорити виклик функції",
          "Щоб зберегти метадані оригінальної функції на обгортці",
          "Щоб заборонити *args",
          "Щоб автоматично кешувати результат"
        ],
        correctAnswer: 1,
        explanation: "@wraps(func) копіює __name__, __doc__ та інші атрибути на wrapper."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що еквівалентно @repeat(3) над def f(): ...?",
        options: [
          "f = repeat(f)(3)",
          "f = repeat(3)(f)",
          "f = repeat(3, f)",
          "f = repeat()(3)(f)"
        ],
        correctAnswer: 1,
        explanation: "Спочатку фабрика repeat(3) повертає декоратор, потім він застосовується до f."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "При стекуванні @a @b def f(): маємо f = a(b(f)).",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Нижній декоратор застосовується першим, верхній — другим."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Скільки рівнів функцій зазвичай потрібно для декоратора з параметрами?",
        options: [
          "Один",
          "Два",
          "Три",
          "Чотири"
        ],
        correctAnswer: 2,
        explanation: "Фабрика (параметри) → декоратор (func) → wrapper (виклик) — три рівні."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n@add_bang\n@shout\ndef echo(t):\n    return t\n\n# shout → upper, add_bang → +'!'\nprint(echo('hi'))",
        options: [
          "HI!",
          "!HI",
          "hi!",
          "Hi!"
        ],
        correctAnswer: 0,
        explanation: "Спочатку shout робить 'HI', потім add_bang додає '!' → 'HI!'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що станеться, якщо написати @repeat замість @repeat(3) для фабрики?",
        options: [
          "Все працюватиме як @repeat(1)",
          "Параметром times стане сама функція — декоратор зламається",
          "Python проігнорує декоратор",
          "Автоматично підставиться times=0"
        ],
        correctAnswer: 1,
        explanation: "Без виклику фабрики функція потрапляє в параметр times, структура трьох рівнів руйнується."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "*args у wrapper — це словник іменованих аргументів.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. *args — кортеж позиційних; **kwargs — словник іменованих."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який імпорт потрібен для @wraps?",
        options: [
          "from functools import wraps",
          "from typing import wraps",
          "import wraps",
          "from decorators import wraps"
        ],
        correctAnswer: 0,
        explanation: "wraps є в стандартній бібліотеці: from functools import wraps."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
