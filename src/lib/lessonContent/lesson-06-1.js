/**
 * Lesson 06-1: Вступ до декораторів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_1 = {
  lessonId: "lesson-06-1",
  moduleId: "module-06",
  order: 1,
  title: "Вступ до декораторів",

  learningObjectives: [
    "Розуміти функції як об'єкти першого класу",
    "Пояснити ідею обгортання (wrapping) функції",
    "Використовувати синтаксис @decorator та ручне присвоєння",
    "Створювати прості декоратори для логування та вимірювання часу"
  ],

  prerequisites: ["lesson-05-5"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Функції як об'єкти першого класу",
        content: `У Python функції - це звичайні об'єкти. Їх можна передавати як аргументи, зберігати у змінних і повертати з інших функцій. Саме на цій властивості побудовані декоратори.

**Що означає «перший клас»?**

1. Функцію можна присвоїти змінній
2. Функцію можна передати як аргумент
3. Функцію можна повернути з іншої функції
4. Функцію можна зберігати у списках і словниках

\`\`\`python
def greet(name):
    return f"Привіт, {name}!"

# Присвоєння функції змінній (без виклику!)
say_hi = greet
print(say_hi("Оля"))  # Привіт, Оля!

# Передача функції як аргумента
def call_twice(func, value):
    print(func(value))
    print(func(value))

call_twice(greet, "Максим")
\`\`\`

**Важливо:** \`greet\` - це посилання на функцію, а \`greet()\` - виклик. Без дужок ми працюємо з самим об'єктом функції.`
      },
      {
        title: "Ідея обгортання (wrapping)",
        content: `Декоратор - це функція, яка приймає іншу функцію і повертає нову («обгортку»), що додає поведінку до і/або після оригінального виклику.

**Схема роботи:**

1. Беремо оригінальну функцію \`func\`
2. Створюємо \`wrapper\`, який викликає \`func\`
3. Перед і після виклику додаємо свій код (лог, таймер, перевірку…)
4. Повертаємо \`wrapper\` замість оригіналу

\`\`\`python
def simple_wrapper(func):
    def wrapper():
        print("До виклику")
        func()
        print("Після виклику")
    return wrapper

def hello():
    print("Привіт!")

# Ручне обгортання
hello = simple_wrapper(hello)
hello()
# До виклику
# Привіт!
# Після виклику
\`\`\`

Оригінальна \`hello\` не змінюється всередині - ми лише підміняємо ім'я на нову функцію-обгортку.`
      },
      {
        title: "Синтаксис @decorator vs ручне присвоєння",
        content: `Символ \`@\` - це синтаксичний цукор. Обидва варіанти нижче еквівалентні.

**Ручне присвоєння:**

\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Виклик: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

def add(a, b):
    return a + b

add = log_calls(add)
print(add(2, 3))  # Виклик: add → 5
\`\`\`

**З синтаксисом @:**

\`\`\`python
@log_calls
def add(a, b):
    return a + b

print(add(2, 3))  # те саме
\`\`\`

Python читає \`@log_calls\` як: «визнач функцію, потім зроби \`add = log_calls(add)\`».

**Правила:**
- \`@\` пишеться безпосередньо над \`def\`
- Декоратор має повертати викликаємий об'єкт (зазвичай функцію)
- Один \`@\` - одне обгортання; кілька \`@\` можна ставити один над одним (детальніше в наступному уроці)`
      },
      {
        title: "Простий декоратор логування",
        content: `Найпоширеніший перший декоратор - логування викликів.

\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Початок: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Кінець: {func.__name__}")
        return result
    return wrapper

@log_calls
def greet(name):
    print(f"Привіт, {name}!")

greet("Андрій")
# Початок: greet
# Привіт, Андрій!
# Кінець: greet
\`\`\`

**Чому \`*args\` і \`**kwargs\`?**

Щоб обгортка працювала з будь-якою кількістю позиційних і іменованих аргументів. Інакше декоратор був би прив'язаний лише до однієї сигнатури.`
      },
      {
        title: "Ідея декоратора вимірювання часу",
        content: `Декоратор може вимірювати, скільки часу виконується функція - корисно для оптимізації.

\`\`\`python
import time

def measure_time(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__}: {elapsed:.4f} с")
        return result
    return wrapper

@measure_time
def slow_sum(n):
    return sum(range(n))

print(slow_sum(1_000_000))
\`\`\`

**Що запам'ятати:**
- Декоратор не замінює логіку функції - він доповнює її
- Завжди повертайте результат \`func(...)\`, інакше отримаєте \`None\`
- Для навчальних задач час часто підставляють з stdin замість \`time.time()\`, щоб вивід був передбачуваним`
      },
      {
        title: "Коли декоратори доречні",
        content: `Декоратори зручні, коли ту саму «обгортку» потрібно застосувати до багатьох функцій:

1. **Логування** - хто і коли викликав функцію
2. **Профілювання** - скільки часу зайняло виконання
3. **Перевірка доступу** - чи авторизований користувач
4. **Валідація** - чи коректні аргументи

**Поки що важливо:**
- Розуміти, що \`@decorator\` = \`func = decorator(func)\`
- Вміти написати простий \`wrapper\` з логами
- Не плутати визначення функції з її викликом

У наступному уроці ми додамо \`functools.wraps\`, фабрики декораторів і стекування кількох \`@\`.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Функція як значення",
      code: `def square(x):
    return x * x

operations = [square, abs, str]
for op in operations:
    print(op(5))
# 25
# 5
# 5`,
      explanation: "Функції зберігаються у списку й викликаються як звичайні об'єкти."
    },
    {
      title: "Ручне обгортання",
      code: `def announce(func):
    def wrapper(name):
        print("Зараз буде привітання")
        func(name)
        print("Готово")
    return wrapper

def hello(name):
    print(f"Вітаю, {name}!")

hello = announce(hello)
hello("Марія")`,
      explanation: "Еквівалент синтаксису @announce без використання символу @."
    },
    {
      title: "Декоратор з @",
      code: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Виклик: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def multiply(a, b):
    return a * b

print(multiply(4, 5))`,
      explanation: "Синтаксичний цукор @log_calls замінює ручне multiply = log_calls(multiply)."
    },
    {
      title: "Логування початку і кінця",
      code: `def border(func):
    def wrapper(*args, **kwargs):
        print(f"Початок: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Кінець: {func.__name__}")
        return result
    return wrapper

@border
def say(msg):
    print(msg)

say("Python!")`,
      explanation: "Типовий шаблон: повідомлення до виклику, виклик, повідомлення після."
    }
  ],

  commonMistakes: [
    {
      mistake: "Забути повернути wrapper з декоратора",
      explanation: "Якщо декоратор нічого не повертає, ім'я функції стане None і виклик впаде з TypeError.",
      correctApproach: "Завжди закінчуйте декоратор рядком: return wrapper"
    },
    {
      mistake: "Забути повернути результат func()",
      explanation: "Без return результат оригінальної функції губиться - зовнішній код отримує None.",
      correctApproach: "Пишіть: result = func(*args, **kwargs); return result"
    },
    {
      mistake: "Плутати greet і greet()",
      explanation: "Декоратор приймає об'єкт функції, а не результат її виклику.",
      correctApproach: "Передавайте greet без дужок: decorate(greet), не decorate(greet())"
    },
    {
      mistake: "Жорстко фіксувати аргументи wrapper",
      explanation: "wrapper(a, b) не спрацює для функцій з іншою кількістю параметрів.",
      correctApproach: "Використовуйте def wrapper(*args, **kwargs)"
    }
  ],

  summary: `На цьому уроці ми вивчили основи декораторів:

1. Функції - об'єкти першого класу: їх можна передавати, зберігати й повертати
2. Wrapping - декоратор обгортає функцію новою поведінкою
3. @decorator - синтаксичний цукор для func = decorator(func)
4. Прості сценарії - логування викликів і вимірювання часу
5. *args/**kwargs - роблять обгортку універсальною

Далі навчимося зберігати метадані через functools.wraps і створювати декоратори з параметрами.`,

  practiceTask: {
    title: "Декоратор логування виклику",
    description: "Створіть декоратор, який друкує початок і кінець виклику функції",
    problemStatement: `Створіть декоратор **log_calls**, який:
1. Перед викликом функції друкує \`Початок: <ім'я_функції>\`
2. Викликає оригінальну функцію
3. Після виклику друкує \`Кінець: <ім'я_функції>\`
4. Повертає результат функції

Застосуйте декоратор до функції \`greet(name)\`, яка друкує \`Привіт, <name>!\`.

Зчитайте ім'я зі stdin і викличте \`greet(name)\`.

Формат вводу:
Олександр`,
    outputFormat: `Початок: greet
Привіт, Олександр!
Кінець: greet`,
    examples: [
      {
        input: `Олександр`,
        output: `Початок: greet
Привіт, Олександр!
Кінець: greet`,
        explanation: "Декоратор обгортає greet і друкує межі виклику"
      },
      {
        input: `Марія`,
        output: `Початок: greet
Привіт, Марія!
Кінець: greet`,
        explanation: "Те саме для іншого імені"
      },
      {
        input: `Ігор`,
        output: `Початок: greet
Привіт, Ігор!
Кінець: greet`,
        explanation: "Перевірка з третім ім'ям"
      }
    ],
    solution: {
      code: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Початок: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Кінець: {func.__name__}")
        return result
    return wrapper

@log_calls
def greet(name):
    print(f"Привіт, {name}!")

name = input().strip()
greet(name)`,
      explanation: "log_calls повертає wrapper; @log_calls еквівалентне greet = log_calls(greet). Ім'я береться з stdin."
    },
    hints: [
      "Декоратор має повертати внутрішню функцію wrapper",
      "Використовуйте func.__name__ для імені функції",
      "Не забудьте return wrapper у кінці декоратора",
      "Застосуйте @log_calls безпосередньо над def greet"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає, що функції в Python є об'єктами першого класу?",
        options: [
          "Вони завжди швидші за цикли",
          "Їх можна передавати, зберігати й повертати як звичайні значення",
          "Вони існують лише всередині класів",
          "Їх не можна присвоювати змінним"
        ],
        correctAnswer: 1,
        explanation: "Функції - повноцінні об'єкти: їх передають як аргументи, зберігають у змінних і повертають з інших функцій."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Запис @decorator над def f(): еквівалентний f = decorator(f).",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Синтаксис @ - це цукор для ручного присвоєння обгорнутої функції."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що надрукує цей код?\n\ndef wrap(f):\n    def w():\n        print('A')\n        f()\n        print('B')\n    return w\n\n@wrap\ndef hi():\n    print('Hi')\n\nhi()",
        options: [
          "Hi",
          "A\nHi\nB",
          "A\nB",
          "B\nHi\nA"
        ],
        correctAnswer: 1,
        explanation: "Спочатку wrapper друкує A, потім викликає hi (Hi), потім друкує B."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо в wrapper зазвичай пишуть *args і **kwargs?",
        options: [
          "Щоб прискорити функцію",
          "Щоб обгортка працювала з різною кількістю аргументів",
          "Щоб видалити параметри функції",
          "Це обов'язковий синтаксис Python"
        ],
        correctAnswer: 1,
        explanation: "*args і **kwargs роблять декоратор універсальним для різних сигнатур."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає декоратор, якщо забути return wrapper?",
        options: [
          "Оригінальну функцію",
          "Порожній рядок",
          "None",
          "Список аргументів"
        ],
        correctAnswer: 2,
        explanation: "Функція без return повертає None - ім'я декорованої функції стане None."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Який рядок еквівалентний @log над def add(a, b): ...?",
        options: [
          "add = log(add)",
          "add = log()",
          "log = add(log)",
          "add(log)"
        ],
        correctAnswer: 0,
        explanation: "@log означає add = log(add) після визначення функції."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Декоратор обов'язково змінює вихідний код тіла функції.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Декоратор підміняє ім'я на обгортку, не редагуючи тіло оригінальної функції."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
